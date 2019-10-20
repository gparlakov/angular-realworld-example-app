import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { PusherModule } from './core/services/pusher.module';
import { HomeModule } from './home/home.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { SettingsModule } from './settings/settings.module';
import { ArticleModule } from './article/article.module';
import { MomentModule } from 'ngx-moment';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user/user.effects';
import { loadUser } from './state/user/user.actions';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 55,
        h: 14
      }
    }),
    // pusher.com account -> angularadvancedkiev@gmail.com
    PusherModule.forRoot(/** add the key see agenda doc */ null, {
      cluster: 'eu',
      forceTLS: true
    }),
    SettingsModule,
    ArticleModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(store: Store<State>) {
    store.dispatch(loadUser());
  }
}
