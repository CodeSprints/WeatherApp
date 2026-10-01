# Responsywność

Aplikacja to jeden kod obsługujący telefon, tablet i komputer. Nie ma osobnych
szablonów ani wykrywania urządzenia po nazwie przeglądarki. Układ zmienia się
wyłącznie na podstawie dostępnej szerokości.

## Punkty graniczne

| Nazwa | Szerokość | Zastosowanie |
| --- | --- | --- |
| podstawa | od 320 px | Jedna kolumna, wyszukiwarka pod nagłówkiem. |
| `sm` | od 640 px | Większe odstępy, cztery kafelki informacji dodatkowych. |
| `md` | od 768 px | Wyszukiwarka przenosi się do paska nagłówka. |
| `lg` | od 1024 px | Treść główna i panel boczny obok siebie. |

## Przyjęte zasady

1. Najmniejsza obsługiwana szerokość to 320 px. Ustawia ją reguła `min-w-[320px]` dla `body`.
2. Elementy klikalne mają co najmniej 44 px wysokości, co odpowiada wymaganiu
   WCAG dotyczącemu wielkości celu dotykowego.
3. Listy przewijane w poziomie, czyli prognoza godzinowa i popularne miasta, mają
   atrybut `tabindex="0"`, więc można je przewijać także klawiaturą.
4. Teksty skracane są przez `truncate`, a kontenery mają `min-w-0`, aby długie
   nazwy miast nie rozpychały układu.
5. Panel boczny z ulubionymi i historią na wąskim ekranie znajduje się pod treścią
   główną, a nie jest ukrywany. Żadna funkcja nie znika na telefonie.
6. Wykres używa trybu `responsive` biblioteki Chart.js i dopasowuje się do kontenera
   o stałej wysokości.

## Tryb ciemny

Motyw jest sterowany klasą `dark` na elemencie `html`. Wybór zapisywany jest
w pamięci przeglądarki, a przy pierwszym uruchomieniu brana jest pod uwagę
preferencja systemu operacyjnego.

## Ograniczony ruch

Reguła `prefers-reduced-motion` wyłącza animacje i płynne przewijanie dla osób,
które ustawiły taką preferencję w systemie.
