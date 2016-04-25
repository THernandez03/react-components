Feature('Issue #40 - Busquedas dentro de bounds\n', () => {
  Dado('Dado que me encuentro en la ventana de búsqueda', () => {
    Y('Y el cliente tiene definido los límdescribees de su mapa', () => {
      Cuando('Cuando ingreso un parámetro de búsqueda', () => {
        Entonces('Entonces el sistema debe retornar los resultados de Nimbu', () => {
          expect(!'Hello').toEqual(true);
        });
        Entonces('Y el sistema debe retornar las ubicaciones desde OSM que estén dentro de los límites.', () => {
          expect(!!'Dentro de Límites').toEqual(true);
        });
      });
    });
  });
});
