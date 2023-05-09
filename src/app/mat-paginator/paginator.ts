import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Registros por página:';
    override nextPageLabel = 'Siguiente página';
    override previousPageLabel = 'Página anterior';
    override firstPageLabel = 'Primera página';
    override lastPageLabel = 'Última página';
    override getRangeLabel = function(page: number, pageSize: number, length: any) {
      const from = page * pageSize + 1;
      const to = (page + 1) * pageSize;
      return `${from} - ${to} de ${length}`;
    }
  }