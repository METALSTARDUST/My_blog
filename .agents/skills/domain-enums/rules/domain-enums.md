# Domain Enums

## Contents

- [Philosophy](#philosophy)
- [Place and name enums consistently](#place-and-name-enums-consistently)
- [Create a canonical enum object](#create-a-canonical-enum-object)
- [Preserve TypeScript inference](#preserve-typescript-inference)
- [Never use loose domain strings](#never-use-loose-domain-strings)
- [Put behavior on the entry](#put-behavior-on-the-entry)
- [Put methods on entries when appropriate](#put-methods-on-entries-when-appropriate)
- [Separate code identity from wire values](#separate-code-identity-from-wire-values)
- [Treat external strings as untrusted](#treat-external-strings-as-untrusted)
- [Review and refactor](#review-and-refactor)
- [Do not use this pattern blindly](#do-not-use-this-pattern-blindly)
- [Completion checklist](#completion-checklist)

## Philosophy

Most software domains contain finite sets of values: order statuses, user roles, regions, payment states, workflow stages, plan types, and permission levels.

Treat these values as domain objects, not as unrelated strings or integer aliases. Think of each entry as a small immutable instance that carries its own fields and pure behavior.

An enum entry is more than a constant. It can own:

- a stable name;
- an index or ordering;
- labels and descriptions;
- flags and capabilities;
- transition rules;
- pure methods;
- any other knowledge intrinsic to that entry.

The goal is not enum syntax. The goal is to give domain knowledge one canonical home.

## Place and name enums consistently

Keep an enum near the domain model that owns it, not inside an arbitrary caller, UI component, route handler, or generic constants file.

Follow these defaults unless the repository already defines another convention:

- Use a singular PascalCase name for the enum object, such as `OrderStatus` or `UserRole`.
- Use stable UPPER_SNAKE_CASE keys, such as `IN_REVIEW`.
- Let each entry's `name` match its key.
- Name the module after the domain concept using the repository's filename convention.
- Keep the shared `createEnum` factory in a small domain utility module when several enums use it.
- Export derived types and collections from the enum module instead of rebuilding them in callers.

If multiple packages need the same enum, share the canonical module when the dependency graph allows it. Otherwise, treat the duplicated representation as an explicit contract and test that both sides accept the same serialized values.

## Create a canonical enum object

JavaScript does not have Java-style enum instances. A small factory provides the useful runtime behavior without a dependency:

```js
export const createEnum = (entries, { defaultFields = {} } = {}) => {
  const result = {}

  Object.keys(entries).forEach((key, index) => {
    result[key] = {
      name: key,
      index,
      ...defaultFields,
      ...entries[key],
    }
  })

  return result
}
```

Every entry receives a stable `name`, a deterministic `index`, shared defaults, and its own fields:

```js
export const OrderStatus = createEnum({
  PENDING: {
    label: 'Pending',
    isOpen: true,
    canCancel: true,
  },
  SHIPPED: {
    label: 'Shipped',
    isOpen: true,
    canCancel: false,
  },
  DELIVERED: {
    label: 'Delivered',
    isOpen: false,
    canCancel: false,
  },
})
```

Use `defaultFields` when most entries share a value:

```js
export const PaymentState = createEnum(
  {
    PENDING: {
      label: 'Pending',
      canRetry: false,
    },
    FAILED: {
      label: 'Failed',
      canRetry: true,
    },
    PAID: {
      label: 'Paid',
      isFinal: true,
    },
  },
  {
    defaultFields: {
      isFinal: false,
      canRetry: false,
    },
  },
)
```

Entry fields override defaults.

## Preserve TypeScript inference

When using TypeScript, type the factory once and keep assertions inside it:

```ts
type EnumFields = Record<string, unknown>
type EnumDefinition = Record<string, EnumFields>
type EmptyFields = Record<never, never>

type CreatedEnum<
  TEntries extends EnumDefinition,
  TDefaults extends EnumFields,
> = {
  readonly [K in keyof TEntries]: Readonly<
    { name: K; index: number } & TDefaults & TEntries[K]
  >
}

export function createEnum<
  const TEntries extends EnumDefinition,
  const TDefaults extends EnumFields = EmptyFields,
>(
  entries: TEntries,
  { defaultFields = {} as TDefaults }: { defaultFields?: TDefaults } = {},
): CreatedEnum<TEntries, TDefaults> {
  const result = Object.fromEntries(
    Object.entries(entries).map(([name, fields], index) => [
      name,
      Object.freeze({ name, index, ...defaultFields, ...fields }),
    ]),
  )

  return Object.freeze(result) as CreatedEnum<TEntries, TDefaults>
}
```

Derive types from the runtime definition instead of maintaining a separate union:

```ts
export type OrderStatusName = keyof typeof OrderStatus
export type OrderStatusEntry =
  (typeof OrderStatus)[keyof typeof OrderStatus]
```

Do not define the same set independently in a union, an array, a validation schema, and a label map. Derive supporting structures from the canonical enum whenever possible.

When a decision genuinely must branch by entry, preserve TypeScript exhaustiveness:

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled enum entry: ${String(value)}`)
}

function getActionLabel(status: OrderStatusName): string {
  switch (status) {
    case OrderStatus.PENDING.name:
      return 'Cancel'
    case OrderStatus.SHIPPED.name:
      return 'Track'
    case OrderStatus.DELIVERED.name:
      return 'Archive'
    default:
      return assertNever(status)
  }
}
```

Before writing a `switch`, first ask whether the result should be a field or pure method on the entry. Use exhaustive branching only when the behavior does not fit naturally on one entry.

## Never use loose domain strings

This is the strict rule:

```ts
if (order.status === OrderStatus.SHIPPED.name) {
  // Good
}

if (order.status === 'SHIPPED') {
  // Bad
}
```

Apply it consistently to:

- comparisons;
- assignments;
- default values;
- filters;
- internal payloads;
- test factories and mocks;
- option lists;
- persisted domain values produced by the application.

Loose strings create silent failure modes:

- typos compile;
- case variations look valid;
- renames are incomplete;
- AI assistants invent plausible values;
- callers drift away from the domain definition.

Literals may appear in the canonical definition and in tests or adapters whose explicit purpose is to verify an external wire contract. Convert validated external values to canonical entries at the boundary.

## Put behavior on the entry

Do not make callers reconstruct capabilities from lists of names.

**Bad:**

```ts
const isOpen =
  order.status === 'PENDING' ||
  order.status === 'SHIPPED'
```

**Still bad:**

```ts
const isOpen =
  order.status === OrderStatus.PENDING.name ||
  order.status === OrderStatus.SHIPPED.name
```

The second version avoids magic strings but still puts domain knowledge in the caller.

**Good:**

```ts
const isOpen = OrderStatus[order.status].isOpen
```

The caller asks a domain question. The enum entry owns the answer.

The same principle applies to permissions:

**Bad:**

```ts
const canManageUsers =
  user.role === UserRole.ADMIN.name ||
  user.role === UserRole.OWNER.name
```

**Good:**

```ts
const canManageUsers = UserRole[user.role].canManageUsers
```

Adding a new role now requires updating the role definition, not finding every caller that reconstructed the list.

## Put methods on entries when appropriate

Fields handle most behavior. Pure methods are useful when an entry owns logic that accepts input:

```ts
export const SubscriptionPlan = createEnum({
  FREE: {
    label: 'Free',
    canAddMember(currentMembers) {
      return currentMembers < 1
    },
  },
  TEAM: {
    label: 'Team',
    canAddMember(currentMembers) {
      return currentMembers < 20
    },
  },
  ENTERPRISE: {
    label: 'Enterprise',
    canAddMember() {
      return true
    },
  },
})

if (SubscriptionPlan[account.plan].canAddMember(team.size)) {
  // ...
}
```

Keep entry behavior deterministic and intrinsic to the entry. Do not put database access, network requests, UI components, global state mutations, or unrelated orchestration on enum entries. Rules that depend on multiple entities or external context belong in a domain service.

## Separate code identity from wire values

Keep the enum key and `name` as the stable identity used by application code. When a database, protocol, legacy system, or third-party API requires a different representation, add a `value` field for that wire format.

```ts
export const PodType = createEnum({
  WEB_APP: {
    value: 'webapp',
    label: 'Web App',
  },
  BUILD: {
    value: 'build',
    label: 'Build',
  },
})

PodType.WEB_APP.name // 'WEB_APP', used in application code
PodType.WEB_APP.value // 'webapp', used at the external boundary
```

Use the distinction consistently:

```ts
if (pod.type === PodType.WEB_APP.name) {
  // Internal comparison
}

await externalApi.createPod({
  type: PodType.WEB_APP.value,
})
```

Do not leak the wire value back into callers:

```ts
if (pod.type === 'webapp') {
  // Bad: external representation became a magic domain string
}
```

When storing the value:

- Persist `name` when the application owns the schema and wants the stable code identity.
- Persist or send `value` when an external contract owns the representation.
- Never assume `name` and `value` are interchangeable.
- Treat changes to persisted names or wire values as data or contract migrations.
- Create reverse lookup maps from the enum instead of duplicating values elsewhere.

```ts
export const PodTypeByValue = Object.fromEntries(
  Object.values(PodType).map(entry => [entry.value, entry]),
)

const podType = PodTypeByValue[externalPod.type]

if (!podType) {
  throw new Error(`Unknown pod type: ${externalPod.type}`)
}
```

After converting at the boundary, pass the canonical `name` or entry through the rest of the application.

## Treat external strings as untrusted

APIs, databases, files, URLs, queues, and user input often represent enum names as strings. Validate them before indexing:

```ts
export function isOrderStatusName(
  value: string,
): value is OrderStatusName {
  return Object.hasOwn(OrderStatus, value)
}

export function getOrderStatus(value: string): OrderStatusEntry {
  if (!isOrderStatusName(value)) {
    throw new Error(`Unknown order status: ${value}`)
  }

  return OrderStatus[value]
}
```

Do not silence boundary uncertainty with a cast:

```ts
const status = response.status as OrderStatusName // Bad
```

A cast does not validate runtime data.

## Review and refactor

When creating or reviewing code:

1. Search for repeated strings that represent domain values.
2. Find manually maintained unions, arrays, label maps, and permission maps.
3. Identify `||` chains, ternaries, and `switch` statements branching on those values.
4. Create or reuse the canonical enum.
5. Decide whether external formats require a separate `value`.
6. Replace literal callers with enum references.
7. Move intrinsic flags, labels, capabilities, and pure methods onto entries.
8. Derive types, option collections, and reverse lookups from the enum.
9. Validate external values at boundaries.
10. Search again for every old literal.
11. Run the relevant type checks and tests.

Useful review prompt:

```text
Review the changed code for finite domain value sets. Replace loose strings
with canonical enum entries, derive types from the runtime definition, and move
intrinsic behavior from callers onto entries. Report any remaining literal that
is intentionally part of an external contract.
```

## Do not use this pattern blindly

Do not create an enum for:

- user-defined or open-ended values;
- records that can be added dynamically without a code change;
- arbitrary text;
- values whose behavior belongs entirely to another entity;
- a one-off technical constant with no domain meaning.

The deciding question is:

> Is this a finite set of domain choices whose values own knowledge or behavior?

If yes, model it as an enum-like object.

## Completion checklist

- One canonical definition owns the finite set.
- Callers contain no loose domain strings.
- Types are derived from the runtime object.
- Stable labels, flags, capabilities, and methods live on entries.
- External wire formats use an explicit `value` only when they differ from `name`.
- External strings are validated before lookup.
- Adding a new entry does not require editing scattered callers.
- Searches find no accidental duplicate representations.
- Type checks and relevant tests pass.
