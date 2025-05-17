import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  //////////////////////////////////// 1 ////////////////////////////////////
  // users$: Observable<Array<User> | null> = of(null)
  // private userService = inject(UserService)
  private cd = inject(ChangeDetectorRef)
  message = ''
  obj = {}

  changeMessage() {
    this.obj = { ...this.obj, message: this.message }

    setTimeout(() => {
          this.obj = { ...this.obj, message: 'change' }
          this.cd.detectChanges()
    }, 1000);
  }

  //////////////////////////////////// 1 ////////////////////////////////////
  // users$: Observable<Array<User> | null> = of(null)
  // private userService = inject(UserService)


  // ngOnInit(): void {
  //   this.users$ = this.userService.getUsers()
  // }
  //////////////////////////////////// 1 ////////////////////////////////////


  //////////////////////////////////// 2 ////////////////////////////////////
  // users: Array<User> = []
  // private userService = inject(UserService)
  // private subscription = new Subscription()


  // ngOnInit(): void {
  //   this.subscription.add(this.userService.getUsers().subscribe((res: Array<User>) => {
  //     this.users = res;
  //   }))
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
  //////////////////////////////////// 2 ////////////////////////////////////


  ////////////////////////////////// 3 ////////////////////////////////////
  // users: Array<User> = []
  // private userService = inject(UserService)
  // private destroy$ = new Subject<void>();


  // ngOnInit(): void {
  //   this.userService.getUsers()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((res: Array<User>) => {
  //       this.users = res;
  //     });
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
  ////////////////////////////////// 3 ////////////////////////////////////

  //////////////////////////////// 4 ////////////////////////////////////
  // users: Array<User> = []
  // private userService = inject(UserService)
  // private destroy$ = new Subject<void>();


  // ngOnInit(): void {
  //   this.userService.getUsers()
  //     .pipe(take(1))
  //     .subscribe((res: Array<User>) => {
  //       this.users = res;
  //     });
  // }

  // ngOnDestroy() {

  // }
  //////////////////////////////// 4 ////////////////////////////////////

  // users: Array<User> = []
  // private userService = inject(UserService)
  // private bitcoinPriceService = inject(BitcoinPriceService)
  // private subscription = new Subscription()

  // ngOnInit(): void {
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }

  // async getUsers() {
  //   setTimeout(() => {
  //     console.log('setTimeout 1000')
  //   }, 1000);
  //   setTimeout(() => {
  //     console.log('setTimeout 1')
  //   }, 1);
  //   setTimeout(() => {
  //     console.log('setTimeout 0')
  //   }, 0);

  //   console.log('sync zdar')

  //   this.users = await lastValueFrom(this.userService.getUsers());
  //   console.log(this.users, 'this.users z await')
  //   this.userService.getUsers().subscribe((res) => console.log(res, 'subscribe'))
  //   lastValueFrom(this.userService.getUsers()).then((res) => setTimeout(() => {
  //     console.log(res, 'then in settimout 1001')
  //   }, 1001))

  //   lastValueFrom(this.userService.getUsers()).then((res) => console.log(res, 'then 0'))

  //   lastValueFrom(this.userService.getUsers()).then((res) => console.log(res, 'then 1'))

  //   lastValueFrom(this.userService.getUsers()).then((res) => console.log(res, 'then 2'))
  //   lastValueFrom(this.userService.getUsers()).then((res) => setTimeout(() => {
  //     console.log(res, 'then in settimout 0')
  //   }, 0))



  //   console.log('sync ahoj')
  //   console.log('sync cau')


  // }

}
