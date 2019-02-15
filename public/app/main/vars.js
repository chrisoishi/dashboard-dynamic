vars = {
    theme: {
        primary: '#424242',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#ff4444',
        info: '#33b5e5',
        success: '#00C851',
        warning: '#ffbb33'
    },
    header: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    },
    models: {
        tabs_cards: [{
            text: 'Layouts',
            cards: [{
                    layout: 'dash-layout-1x2',
                    content: '1x2',
                },
                {
                    layout: 'dash-layout-2x1',
                    content: '2x1',
                },
            ]
        }, {
            text: 'Cartões',
            cards: [{
                    layout: 'dash-card-carrosel',
                    content: 'Carrosel de imagens',
                },
                {
                    layout: 'dash-card-image',
                    content: 'Imagem com texto',
                },
                {
                    layout: 'dash-card-birthday',
                    content: 'Aniversariante do mês',
                },
                {
                    layout: 'dash-card-survey',
                    content: 'Enquete',
                },
                {
                    layout: 'dash-card-feed',
                    content: 'Feed de notícia',
                },
                {
                    layout: 'dash-card-video',
                    content: 'Vídeo',
                }
            ]
        }, ]
    }
}
