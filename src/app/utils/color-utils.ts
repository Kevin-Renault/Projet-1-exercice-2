
export class ColorUtils {

  /**
   * Génère un tableau de couleurs distinctes en HSL,
   * en évitant les couleurs trop sombres ou trop claires.
   * @param count Nombre de couleurs souhaité
   * @returns Tableau de couleurs au format hexadécimal (#RRGGBB)
   */
  static generateDistinctColors(count: number): string[] {
    const colors: string[] = [];
    const hueStep = 360 / count; // Répartition uniforme de la teinte (Hue)

    for (let i = 0; i < count; i++) {
      const hue = Math.round(i * hueStep) % 360; // Hue entre 0 et 360
      const saturation = 70 + Math.round(Math.random() * 20); // Saturation entre 70% et 90%
      const lightness = 50 + Math.round(Math.random() * 10); // Lightness entre 50% et 60% (évite le trop clair/sombre)
      colors.push(ColorUtils.hslToHex(hue, saturation, lightness));
    }

    return colors;
  }


  /**
   * Convertit une couleur HSL en hexadécimal.
   * @param h Teinte (0-360)
   * @param s Saturation (0-100)
   * @param l Luminosité (0-100)
   * @returns Couleur au format #RRGGBB
   */
  static hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (60 <= h && h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (120 <= h && h < 180) {
      [r, g, b] = [0, c, x];
    } else if (180 <= h && h < 240) {
      [r, g, b] = [0, x, c];
    } else if (240 <= h && h < 300) {
      [r, g, b] = [x, 0, c];
    } else if (300 <= h && h < 360) {
      [r, g, b] = [c, 0, x];
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

}
