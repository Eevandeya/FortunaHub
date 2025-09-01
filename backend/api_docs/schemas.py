ERROR_OBJECT_SCHEMA = {
    "type": "object",
    "properties": {
        "message": {"type": "string"},
        "code": {"type": "string"},
        "params": {"type": "object"},
    },
    "required": ["message"],
    "additionalProperties": False,
}

ERROR_ENTRY_SCHEMA = {
    "oneOf": [
        {"type": "string"},
        ERROR_OBJECT_SCHEMA,
    ]
}

ERROR_LIST_SCHEMA = {
    "type": "array",
    "items": ERROR_ENTRY_SCHEMA,
    "minItems": 1,
}

VALIDATION_ERROR_SCHEMA = {
    "type": "object",
    "properties": {
        "non_field_errors": ERROR_LIST_SCHEMA,
    },
    "additionalProperties": ERROR_LIST_SCHEMA,
}

INVALID_QUERY_PARAM_SCHEMA = {
    "type": "object",
    "properties": {"error": {"type": "string"}},
    "required": ["error"],
    "additionalProperties": False,
}

INVALID_API_KEY_SCHEMA = {
    "type": "object",
    "properties": {"detail": {"type": "string"}},
    "required": ["detail"],
    "additionalProperties": False,
}
