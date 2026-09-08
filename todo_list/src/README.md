# Branches route — connected + admin infra fixes

## New files (place at these exact paths)
- frontend/lib/admin/roles.ts
- frontend/lib/admin/role-context.tsx
- frontend/lib/admin/types.ts
- frontend/lib/admin/store.ts

## DELETE these old files (moved, not duplicated)
- frontend/app/admin/roles.ts
- frontend/app/admin/role-context.tsx

## Updated files (overwrite existing)
- frontend/app/admin/branches/_components/BranchesContent.tsx
- frontend/app/admin/branches/_components/BranchFormDialog.tsx
- frontend/app/admin/branches/[id]/_components/BranchDetailContent.tsx
- frontend/app/admin/audit-logs/_components/AuditLogsContent.tsx (fixes a broken AccessDenied import found while wiring branches)

## Why the lib/admin files exist
The entire /admin section imports `@/lib/admin/role-context`, `@/lib/admin/roles`,
`@/lib/admin/store`, and `@/lib/admin/types` — none of which existed at that
path. `role-context.tsx`/`roles.ts` existed but at the wrong location
(`app/admin/`) and were moved. `store.ts`/`types.ts` never existed at all and
were created as minimal placeholders so admin pages you haven't connected yet
don't crash the whole section. See comments in each file for details.
