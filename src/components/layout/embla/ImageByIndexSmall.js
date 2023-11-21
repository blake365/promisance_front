import image1 from '../../../images/screenshots/mobileuseturns.webp'
import image2 from '../../../images/screenshots/mobilescores.webp'
import image3 from '../../../images/screenshots/mobileoverview.webp'
import image4 from '../../../images/screenshots/mobileindy.webp'

export const images = [image1, image2, image3, image4]

const imageByIndexSmall = (index) => images[index % images.length]

export default imageByIndexSmall
