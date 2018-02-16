import { NgModule } from '@angular/core';
import { SortByPipe } from './sort-by/sort-by';
import { SortDescByPipe } from './sort-desc-by/sort-desc-by';
@NgModule({
	declarations: [SortByPipe,
    SortDescByPipe],
	imports: [],
	exports: [SortByPipe,
    SortDescByPipe]
})
export class PipesModule {}
