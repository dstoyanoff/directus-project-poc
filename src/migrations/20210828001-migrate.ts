/* eslint-disable no-irregular-whitespace */
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async transaction => {
    await transaction.raw(`
create table "test" ("id" serial primary key, "status" character varying default 'draft', "sort" integer null default null, "user_created" uuid null default null, "date_created" timestamp with time zone null default null, "user_updated" uuid null default null, "date_updated" timestamp with time zone null default null);
alter table "test" add constraint "test_user_created_foreign" foreign key ("user_created") references "directus_users" ("id");
alter table "test" add constraint "test_user_updated_foreign" foreign key ("user_updated") references "directus_users" ("id");
 
insert into "directus_collections" ("accountability", "archive_app_filter", "archive_field", "archive_value", "collection", "color", "display_template", "hidden", "icon", "item_duplication_fields", "note", "singleton", "sort_field", "translations", "unarchive_value") values ('all', true, 'status', 'archived', 'test', NULL, NULL, false, NULL, NULL, NULL, false, 'sort', NULL, 'draft');
insert into "directus_fields" ("collection", "conditions", "display", "display_options", "field", "group", "hidden", "interface", "note", "options", "readonly", "required", "sort", "special", "translations", "width") values ('test', NULL, NULL, NULL, 'id', NULL, true, 'input', NULL, NULL, true, false, NULL, NULL, NULL, 'full'), ('test', NULL, 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', 'status', NULL, false, 'select-dropdown', NULL, '{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"},{"text":"Archived","value":"archived"}]}', false, false, NULL, NULL, NULL, 'full'), ('test', NULL, NULL, NULL, 'sort', NULL, true, 'input', NULL, NULL, false, false, NULL, NULL, NULL, 'full'), ('test', NULL, 'user', NULL, 'user_created', NULL, true, 'select-dropdown-m2o', NULL, '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', true, false, NULL, 'user-created', NULL, 'half'), ('test', NULL, 'datetime', '{"relative":true}', 'date_created', NULL, true, 'datetime', NULL, NULL, true, false, NULL, 'date-created', NULL, 'half'), ('test', NULL, 'user', NULL, 'user_updated', NULL, true, 'select-dropdown-m2o', NULL, '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', true, false, NULL, 'user-updated', NULL, 'half'), ('test', NULL, 'datetime', '{"relative":true}', 'date_updated', NULL, true, 'datetime', NULL, NULL, true, false, NULL, 'date-updated', NULL, 'half');
insert into "directus_relations" ("junction_field", "many_collection", "many_field", "one_allowed_collections", "one_collection", "one_collection_field", "one_deselect_action", "one_field", "sort_field") values (NULL, 'test', 'user_created', NULL, 'directus_users', NULL, 'nullify', NULL, NULL), (NULL, 'test', 'user_updated', NULL, 'directus_users', NULL, 'nullify', NULL, NULL)
    `);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.transaction(async transaction => {
    await transaction.raw(`
drop table "test";
 
delete from "directus_collections" where ("collection") in (('test'));
delete from "directus_fields" where ("field", "collection") in (('id', 'test'), ('status', 'test'), ('sort', 'test'), ('user_created', 'test'), ('date_created', 'test'), ('user_updated', 'test'), ('date_updated', 'test'));
delete from "directus_relations" where ("many_collection", "many_field", "one_collection", "one_field") in (('test', 'user_created', 'directus_users', NULL), ('test', 'user_updated', 'directus_users', NULL))
    `);
  });
}
