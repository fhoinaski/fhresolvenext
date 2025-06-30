// Exemplo de integração futura com API do Google Places
// Para buscar avaliações automaticamente do Google Meu Negócio

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetailsResponse {
  result: {
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
  };
}

class GoogleReviewsService {
  private apiKey: string;
  private placeId: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
    this.placeId = process.env.GOOGLE_PLACE_ID || ''; // Place ID da FH Resolve
  }

  async fetchReviews(): Promise<GoogleReview[]> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=name,rating,reviews,user_ratings_total&key=${this.apiKey}`
      );

      const data: PlaceDetailsResponse = await response.json();
      
      return data.result.reviews || [];
    } catch (error) {
      console.error('Erro ao buscar avaliações do Google:', error);
      return [];
    }
  }

  formatReviewForComponent(review: GoogleReview, index: number) {
    return {
      id: index + 1,
      name: review.author_name,
      location: 'Florianópolis - SC',
      service: 'Serviços Diversos',
      date: review.relative_time_description,
      rating: review.rating,
      text: review.text,
      image: review.profile_photo_url,
      verified: true,
      source: 'Google Maps',
      authorUrl: review.author_url
    };
  }

  async getFormattedReviews() {
    const reviews = await this.fetchReviews();
    return reviews.map((review, index) => 
      this.formatReviewForComponent(review, index)
    );
  }
}

// Uso no componente (exemplo futuro):
// const reviewsService = new GoogleReviewsService();
// const liveReviews = await reviewsService.getFormattedReviews();

export default GoogleReviewsService;

/*
Para implementar no futuro:

1. Obter API Key do Google Places API
2. Encontrar o Place ID da FH Resolve no Google Maps
3. Configurar as variáveis de ambiente:
   - GOOGLE_PLACES_API_KEY=sua_api_key
   - GOOGLE_PLACE_ID=place_id_da_fh_resolve

4. Substituir as avaliações estáticas por:
   const [reviews, setReviews] = useState(testimonials);
   
   useEffect(() => {
     const loadLiveReviews = async () => {
       const liveReviews = await reviewsService.getFormattedReviews();
       if (liveReviews.length > 0) {
         setReviews(liveReviews);
       }
     };
     
     loadLiveReviews();
   }, []);

5. Implementar cache para evitar muitas chamadas à API
6. Adicionar fallback para as avaliações estáticas em caso de erro
*/
