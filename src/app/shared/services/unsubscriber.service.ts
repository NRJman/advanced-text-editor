import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class UnsubscriberService implements OnDestroy {
    protected subscriptionController$$: Subject<null> = new Subject();

    ngOnDestroy(): void {
        this.subscriptionController$$.next(null);
        this.subscriptionController$$.complete();
    }
}
