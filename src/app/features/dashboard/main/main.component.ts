import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { BitcoinPriceService } from '../../../core/services/bitcoin.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

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

  users: Array<User> = []
  private userService = inject(UserService)
  private bitcoinPriceService = inject(BitcoinPriceService)
  private subscription = new Subscription()

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async getUsers() {
    this.users = await lastValueFrom(this.userService.getUsers());

    this.subscription.add(this.bitcoinPriceService.getBitcoinPrice().subscribe((res) => console.log(res)))

  }

}
