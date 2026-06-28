# Upsilon UI — usage conventions

A React component library (shadcn/ui-style, built on Radix primitives) exported on `window.UpsilonUI`. Style it with **Tailwind CSS utility classes** plus the design tokens below. Components are unstyled-by-default Radix wrappers whose look comes entirely from Tailwind classes baked into each component — so they render correctly as-is; your job is layout glue and composition, in the same idiom.

## Setup / wrapping
No global provider is required — each component is self-contained. **Dark mode**: add the `dark` class to an ancestor element; every token below has a dark value that activates under it.

Several components are **compound** — compose the named parts together, do not use the root alone:
- `Card` → `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Dialog` → `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- `DropdownMenu` → `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`/`DropdownMenuRadioItem`, `DropdownMenuSub*`
- `Select` → `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`
- `Tabs` → `TabsList`, `TabsTrigger`, `TabsContent`
- `Avatar` → `AvatarImage`, `AvatarFallback`

## Styling idiom — Tailwind utilities + semantic tokens
Style via `className` with Tailwind utilities. Use the **semantic color tokens** (not raw colors) so light/dark both work. Each is a Tailwind color usable as `bg-*`, `text-*`, `border-*`, `ring-*`:

| Token | Pairing |
|---|---|
| `background` / `foreground` | page surface + body text |
| `card` / `card-foreground` | card surface |
| `popover` / `popover-foreground` | menus, dropdowns |
| `primary` / `primary-foreground` | primary actions |
| `secondary` / `secondary-foreground` | secondary actions |
| `muted` / `muted-foreground` | subdued surfaces + helper text |
| `accent` / `accent-foreground` | hover/active highlights |
| `destructive` / `destructive-foreground` | danger |
| `border`, `input`, `ring` | hairlines, field borders, focus rings |

Example usage: `className="bg-card text-card-foreground border border-border rounded-lg p-4"`; helper text `className="text-sm text-muted-foreground"`. Radius: `rounded-lg` / `rounded-md` / `rounded-sm` (all derive from `--radius`).

## Component variants (props, not classes)
- `Button`: `variant` = `default | destructive | outline | secondary | ghost | link`; `size` = `default | sm | lg | icon`.
- `Badge`: `variant` = `default | secondary | destructive | outline`.
Other components take native + Radix props — see each component's `<Name>.d.ts`.

## Where the truth lives
- Tokens & compiled styles: `styles.css` and its `@import` of `_ds_bundle.css` (the token CSS variables and `.dark` overrides live here).
- Per-component API + usage: `components/<group>/<Name>/<Name>.d.ts` and `<Name>.prompt.md`.

## Idiomatic build snippet
```jsx
<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Invite teammate</CardTitle>
    <CardDescription className="text-muted-foreground">They'll get an email.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    <Input placeholder="name@company.com" />
    <div className="flex gap-2">
      <Button>Send invite</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  </CardContent>
</Card>
```

> Styling is Tailwind utility classes. Author layout glue with Tailwind utilities and the semantic tokens above; prefer the token colors over literal palette values so designs stay theme-correct in light and dark.
