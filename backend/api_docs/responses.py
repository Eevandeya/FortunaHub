from drf_spectacular.utils import OpenApiResponse

from api_docs.examples import INVALID_API_KEY_EXAMPLE
from api_docs.schemas import INVALID_API_KEY_SCHEMA

HTTP_403_FORBIDDEN_RESPONSE = OpenApiResponse(
    response=INVALID_API_KEY_SCHEMA,
    examples=[INVALID_API_KEY_EXAMPLE],
)
