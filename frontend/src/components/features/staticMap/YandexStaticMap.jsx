import { memo } from 'react';

const BASE_URL = 'https://static-maps.yandex.ru/v1';

const YandexStaticMap = memo(
    ({
        center = '37.620070,55.753630',
        zoom = 13,
        scale = 1,
        size = '450,450',
        points = [],
        lang = 'ru_RU',
        alt = 'Yandex map',
        style = 'tags.any:poi;structure|types:point|elements:label.icon|stylers.scale:0.1',
    }) => {
        const mapUrl = () => {
            const params = new URLSearchParams({
                apikey: import.meta.env.VITE_YANDEX_MAP_APIKEY,
                ll: center,
                z: zoom,
                scale,
                size,
                lang,
                style,
            });

            if (points.length) {
                params.set('pt', points.join('~'));
            }

            return `${BASE_URL}?${params.toString()}`;
        };

        return <img src={mapUrl()} alt={alt} loading='lazy' />;
    }
);

export default YandexStaticMap;
