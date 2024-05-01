import BrotherService from '../services/brothers';

export default (context, inject) => {
  inject('BrotherService', BrotherService)

  context.$BrotherService = BrotherService
}
