@extends('layouts.vuetify-default')

@section('vuetify-app-content')

<v-navigation-drawer v-model="lmenu" fixed app temporary>
    @yield('l-menu')
</v-navigation-drawer>


<v-content>
    @yield('l-content')
</v-content>


<v-footer height="50px" fixed :style="'background-color:transparent'">
    @yield('l-footer')
</v-footer>
@endsection
