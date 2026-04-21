# Migration Guide

Prisma Migrate is used to manage the PostgreSQL schema. All changes to `prisma/schema.prisma` must be synchronized with the database using the following commands.

## Key Commands

### 1. Create a Migration
When you modify `schema.prisma`, run this to generate a new SQL migration file and apply it to your local database:
```bash
npx prisma migrate dev --name <description>
```
*Note: This command may reset your database if it detects drift.*

### 2. Apply Migrations (Production/CI)
To apply all pending migrations without checking for drift or prompting for a reset:
```bash
npx prisma migrate deploy
```

### 3. Reset Database
To drop the schema, recreate it, and trigger the seed script:
```bash
npx prisma migrate reset
```

---

## Migration File Structure

Prisma stores migrations in the `prisma/migrations/` directory. Each migration is a separate folder containing a `migration.sql` file.

```text
prisma/migrations/
├── <timestamp>_init/
│   └── migration.sql
└── <timestamp>_second_iteration_db/
    └── migration.sql
```

### How it Works
- **`migration_lock.toml`:** Tracks which engine version was used to generate the migrations.
- **`_prisma_migrations` Table:** A table created in your PostgreSQL database by Prisma to track which migrations have already been applied to prevent duplicates.

## Best Practices
1. **Never edit SQL files directly:** If a migration fails, it's better to fix the schema and generate a new one, or use `prisma migrate resolve` if in production.
2. **Commit migrations:** Always commit the `prisma/migrations` folder to version control.
3. **Use descriptive names:** Use names like `--name add_user_bio` instead of `--name fix`.
