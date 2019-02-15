@extends('layouts.vuetify-default')

@section('vuetify-app-content')


<v-content>
    @yield('l-content')
</v-content>


<v-footer height="50px" fixed :style="'background-color:transparent'">
    @yield('l-footer')
</v-footer>
@endsection
