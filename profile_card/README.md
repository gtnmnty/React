# Static Profile Card — Project 1

## What is this?

A static React 19 + TypeScript profile card (`Card`) that renders an
avatar, name, role, bio, and a list of skills (`Skills`) — all from typed
props, no interactivity/state.

## Project Structure

```
src/
├── data/
│   └── info.tsx        # ProfileCardProps, SkillsProps, and sample data
└── Profile/
    ├── components/
    │   ├── Card.tsx     # Renders the profile card
    │   └── Skills.tsx   # Renders the skill list
    ├── Profile.tsx
    └── Profile.css
```

- `data/info.tsx` — defines the prop shapes (`ProfileCardProps`,
  `SkillsProps`) and the actual data (`info`, `skills`) as separate
  concerns from the components that render them.
- `Skills.tsx` — child component, renders a `<ul>` of skill `<li>`s from
  an `items` array.
- `Card.tsx` — parent component, renders the avatar/name/role/bio and
  composes `Skills` as a child.

## Props

**`ProfileCardProps`** (`Card`)

| Prop        | Type     | Purpose                  |
|-------------|----------|---------------------------|
| `avatar`    | `string` | Image URL                 |
| `full_name` | `string` | Display name               |
| `role`      | `string` | Job title / role text     |
| `bio`       | `string` | Short biography            |

**`SkillsProps`** (`Skills`)

| Prop    | Type                 | Purpose             |
|---------|----------------------|-----------------------|
| `items` | `readonly string[]`  | List of skill labels  |

## Flow

```
data/info.tsx
   │  (info: ProfileCardProps, skills: string[])
   ▼
Card ({ avatar, full_name, role, bio })
   │
   ├─▶ <img>, <div> name, <div> role, <p> bio   (static JSX)
   │
   └─▶ Skills({ items: skills })
            │
            ▼
       <ul> → items.map(skill => <li key={skill}>{skill}</li>)
```

Data flows one-way: `info.tsx` → `Card` → `Skills`. Neither component
holds state; everything is derived from props passed down.

## Build it from scratch

1. **Define the data shape** in `data/info.tsx`:
   ```tsx
   export interface ProfileCardProps {
       avatar: string;
       full_name: string;
       role: string;
       bio: string;
   }

   export const info = {
       avatar: "...",
       full_name: "Alex Rivera",
       role: "Product Designer",
       bio: "...",
   }
   ```
2. **Add the skills shape and data**, using `readonly` since this list
   is never mutated by the component:
   ```tsx
   export interface SkillsProps {
       readonly items: readonly string[];
   }

   export const skills = ["UI Design", "Design Systems", ...]
   ```
3. **Build the child first (`Skills.tsx`)** — smaller, no nested
   components:
   ```tsx
   import { type SkillsProps } from "../../data/info"

   export function Skills({ items }: SkillsProps) {
       return (
           <ul className="skills">
               {items.map((skill) => (
                   <li key={skill}>{skill}</li>
               ))}
           </ul>
       )
   }
   ```
4. **Build the parent (`Card.tsx`)**, importing both the prop type and
   the `Skills` component:
   ```tsx
   import { skills, type ProfileCardProps } from "../../data/info"
   import { Skills } from "./Skills.tsx"

   export function Card({ avatar, full_name, role, bio }: Readonly<ProfileCardProps>) {
       return (
           <div className="card">
               <img className="avatar" src={avatar} alt={`Avatar of ${full_name}`} />
               <div className="name">{full_name}</div>
               <div className="role">{role}</div>
               <p className="bio">{bio}</p>
               <Skills items={skills} />
           </div>
       )
   }
   ```
5. **Verify:** confirm each skill has a unique `key`, and that all card
   fields render from `info` with no hardcoded text in `Card.tsx`.

## Key takeaways

- Keeping prop **types** and **data** in a separate file (`data/info.tsx`)
  decouples "what shape is this data" from "how is it rendered."
- `key={skill}` works here since skill names are unique and static —
  index keys would be fine too since the list never reorders, but using
  the value itself is a good habit for when it might.
- `Readonly<ProfileCardProps>` / `readonly items: readonly string[]`
  signal that a component only reads props, never mutates them — good
  practice even though React already treats props as immutable by
  convention.