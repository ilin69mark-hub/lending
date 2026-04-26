# Database Setup Instructions

## Вариант 1: Supabase (бесплатный)

1. Зарегистрируйся на https://supabase.com
2. Создай новый проект
3. В Project Settings → Database → получи URI
4. Скопируй URI в формате:
   ```
   postgres://postgres:[password]@aws-0-xxx.pooler.supabase.com:6543/postgres
   ```

## Вариант 2: Локальный PostgreSQL

1. Установи PostgreSQL https://www.postgresql.org/download/
2. Создай базу: `CREATE DATABASE ivandro;`
3. Подключи URI:
   ```
   postgres://postgres:password@localhost:5432/ivandro
   ```

## Настройка

После получения DATABASE_URL:

```bash
# Добавь в .env.local
DATABASE_URL=твой_URI_здесь
```

## Запуск миграции

```bash
psql -d $DATABASE_URL -f database.sql
```

## Проверка

После настройки заявки будут сохраняться в базу данных.