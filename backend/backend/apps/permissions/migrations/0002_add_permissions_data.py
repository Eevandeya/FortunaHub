from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor

# From apps.permissions.Permission.Category
TABLE = "table"
BUSINESS = "business"


def create_default_permissions(apps: Apps, _: BaseDatabaseSchemaEditor) -> None:
    permission_model = apps.get_model("permissions", "Permission")

    # May not create that much? We must solve this together! :/
    # PS: CRUD - Create, Read, Update, Delete
    permissions_to_tables = [
        # ----------------------- Booking (CRUD) -----------------------
        {
            "display_name": "Добавить бронирование",
            "code": "can_create_booking",
            "description": "Владеющий этим правом может создать новое бронирование",
        },
        {
            "display_name": "Просмотреть бронирование",
            "code": "can_read_booking",
            "description": "Владеющий этим правом может просмотреть существующие бронирования",
        },
        {
            "display_name": "Изменить данные в бронировании",
            "code": "can_update_booking",
            "description": "Владеющий этим правом может изменить данные в существующем бронировании",
        },
        {
            "display_name": "Удалить бронирование",
            "code": "can_delete_booking",
            "description": "Владеющий этим правом может удалить существующие бронирования",
        },
        # ----------------------- Pricing (CRUD) -----------------------
        {
            "display_name": "Добавить тариф",
            "code": "can_create_pricing",
            "description": "Владеющий этим правом может добавить новый тип тарифа",
        },
        {
            "display_name": "Просмотреть тарифы",
            "code": "can_read_pricing",
            "description": "Владеющий этим правом может просмотреть существующие тарифы",
        },
        {
            "display_name": "Изменить тариф",
            "code": "can_update_pricing",
            "description": "Владеющий этим правом может изменить существующий тариф",
        },
        {
            "display_name": "Удалить тариф",
            "code": "can_delete_pricing",
            "description": "Владеющий этим правом может удалить существующий тарифы",
        },
        # ---------------------- SaunaConfig (CR) ----------------------
        {
            "display_name": "Добавить новую конфигурацию сауны",
            "code": "can_create_sauna_config",
            "description": "Владеющий этим правом может добавить новый",
        },
        {
            "display_name": "Просмотреть конфигурацию сауны",
            "code": "can_read_sauna_config",
            "description": "Владеющий этим правом может просмотреть существующую конфигурацию сауны",
        },
        # ---------------------- Customers (CRUD) ----------------------
        {
            "display_name": "Добавить клиента",
            "code": "can_create_customer",
            "description": "Владеющий этим правом может добавить нового клиента",
        },
        {
            "display_name": "Просмотреть клиентов",
            "code": "can_read_customer",
            "description": "Владеющий этим правом может просматривать информацию о клиентах",
        },
        {
            "display_name": "Изменить данные клиента",
            "code": "can_update_customer",
            "description": "Владеющий этим правом может изменять данные существующих клиентов",
        },
        {
            "display_name": "Удалить клиента",
            "code": "can_delete_customer",
            "description": "Владеющий этим правом может удалять записи клиентов",
        },
        # -------------------- InventoryItems (CRUD) --------------------
        {
            "display_name": "Добавить предмет инвентаря",
            "code": "can_create_inventory_item",
            "description": "Владеющий этим правом может добавить новый предмет в инвентарь",
        },
        {
            "display_name": "Просмотреть инвентарь",
            "code": "can_read_inventory_item",
            "description": "Владеющий этим правом может просматривать список предметов инвентаря и их количество",
        },
        {
            "display_name": "Изменить данные предмета инвентаря",
            "code": "can_update_inventory_item",
            "description": "Владеющий этим правом может изменять данные предметов инвентаря, включая количество и цену за единицу",
        },
        {
            "display_name": "Удалить предмет инвентаря",
            "code": "can_delete_inventory_item",
            "description": "Владеющий этим правом может удалять предметы из инвентаря",
        },
        # ----------------------- Permission (R) -----------------------
        {
            "display_name": "Просмотреть права доступа",
            "code": "can_read_permission",
            "description": "Владеющий этим правом может просматривать существующие права доступа и их описание",
        },
        # ------------------------- Role (CRUD) -------------------------
        {
            "display_name": "Добавить роль",
            "code": "can_create_role",
            "description": "Владеющий этим правом может создать новую роль с набором прав",
        },
        {
            "display_name": "Просмотреть роли",
            "code": "can_read_role",
            "description": "Владеющий этим правом может просматривать существующие роли и их права",
        },
        {
            "display_name": "Изменить роль",
            "code": "can_update_role",
            "description": "Владеющий этим правом может изменять данные роли",
        },
        {
            "display_name": "Удалить роль",
            "code": "can_delete_role",
            "description": "Владеющий этим правом может удалять роли",
        },
        # ------------------------ Staff (CRUD) ------------------------
        {
            "display_name": "Добавить сотрудника",
            "code": "can_create_staff",
            "description": "Владеющий этим правом может добавить нового сотрудника",
        },
        {
            "display_name": "Просмотреть сотрудников",
            "code": "can_read_staff",
            "description": "Владеющий этим правом может просматривать список сотрудников",
        },
        {
            "display_name": "Изменить данные сотрудника",
            "code": "can_update_staff",
            "description": "Владеющий этим правом может изменять данные сотрудников",
        },
        {
            "display_name": "Удалить сотрудника",
            "code": "can_delete_staff",
            "description": "Владеющий этим правом может удалять сотрудников",
        },
    ]
    permissions_to_business_logic = [
        {
            "display_name": "Может писать Telegram-боту",
            "code": "can_message_bot",
            "description": "Владеющий этим правом может взаимодействовать с Telegram-ботом и отправлять ему команды или сообщения",
        },
        {
            "display_name": "Может перенести бронирование",
            "code": "can_reschedule_booking",
            "description": "Владеющий этим правом может переносить существующее бронирование на другое время",
        },
        # We'll add more later...
    ]

    for t_permission in permissions_to_tables:
        t_permission["category"] = TABLE

    for b_permission in permissions_to_business_logic:
        b_permission["category"] = BUSINESS

    for permission in [*permissions_to_tables, *permissions_to_business_logic]:
        obj, created = permission_model.objects.get_or_create(
            code=permission["code"], defaults=permission
        )
        if not created:
            updated = False
            for field in ("display_name", "description", "category"):
                if getattr(obj, field) != permission.get(field):
                    setattr(obj, field, permission.get(field))
                    updated = True
            if updated:
                obj.save()


class Migration(migrations.Migration):
    dependencies = [
        ("permissions", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_permissions),
    ]
