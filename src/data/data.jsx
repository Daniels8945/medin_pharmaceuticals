import productImg from "../assets/product.png";
import { RiMedicineBottleFill } from "react-icons/ri";
import { RiShieldCrossFill } from "react-icons/ri";
import { GiPill } from "react-icons/gi";

export const AboutUsItems = [
  {
    id: 1,
    icon: <RiMedicineBottleFill />,
    title: "Quality Assurance",
    description:
      "We are committed to providing high-quality products that meet the highest standards of safety and efficacy.",
  },
  {
    id: 2,
    icon: <RiShieldCrossFill />,
    title: "Cutting-Edge Solutions",
    description:
      "Our suite of cutting edge technology has been effective to drive innovation and provide precise and accurate data for our products.",
  },

  {
    id: 3,
    icon: <GiPill />,
    title: "Testing and Certification",
    description:"Our products are tested and certified to ensure they meet global standards and safe for human consumption.",
  }
]

export const ProductItems = [
    {
      id: 1,
      name: "Product Name",
      description: "Product Description",
      image: productImg,
    },
    {
      id: 2,
      name: "Product Name",
      description: "Product Description ",
      image: productImg,
    },
    {
      id: 3,
      name: "Product Name",
      description: "Product Description ",
      image: productImg,
    },

];