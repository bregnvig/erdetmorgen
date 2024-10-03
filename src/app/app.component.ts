import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const isNineOrLess = (): boolean => {
  const now = new Date();
  return now.getHours() < 9 || (now.getHours() === 9 && now.getMinutes() === 0 && now.getSeconds() === 0);
};

const calculateTimeToNext9AM = () => {

  const now = new Date();

  // Calculate the time for the next 9 AM
  const next9AM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);

  // If it's already past 9 AM, add one day
  if (now > next9AM) {
    next9AM.setDate(next9AM.getDate() + 1);
  }

  return +next9AM - +now;
  ;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="flex items-center justify-center h-screen bg-white dark:bg-slate-800">
      <div class="flex flex-col gap-2 text-center">
        <p class="text-xs dark:text-white">Er det morgen?</p>
        <p class="text-6xl dark:text-white uppercase">{{isMorning() ? 'Ja' : 'Nej'}}</p>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  isMorning = signal<boolean>(new Date().getHours() >= 6 && isNineOrLess());



  constructor() {
    setTimeout(() => this.isMorning.set(true), calculateTimeToNext9AM());

  }

}
