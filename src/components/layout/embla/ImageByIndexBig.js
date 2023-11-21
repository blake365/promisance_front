import image1 from '../../../images/screenshots/useturns.webp'
import image2 from '../../../images/screenshots/overview.webp'
import image3 from '../../../images/screenshots/scores.webp'
import image4 from '../../../images/screenshots/war.webp'
import image5 from '../../../images/screenshots/favorites.webp'

export const images = [image1, image2, image3, image4, image5]

const imageByIndexBig = (index) => images[index % images.length]

export default imageByIndexBig
