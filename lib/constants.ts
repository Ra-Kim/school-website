import { Inter, Playfair_Display } from "next/font/google";

export const playfair = Playfair_Display({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });

export const schoolData = {
  name: "Sharon Stars International School",
  shortName: "Sharon Stars",
  phone: ["08035418644", "08169073054"],
  email: "sharonstars@ymail.com",
  motto: "Wisdom is the key to life",
  address:
    "No.8/9 Deeper Life Close off Sars Link Road Rumuagholu , Port Harcourt",
  classes: [
    {
      name: "Creche",
      description:
        "Admission from 3 months to 23 months. Focusing on early childhood development and learning through play.",
    },
    {
      name: "Nusery School",
      description:
        "Admission from 2 years to 5 years. Offering foundational education in a conducive and stimulating environment.",
    },
    {
      name: "Primary School",
      description:
        "Admission from 6 years to 10 years. Providing primary education with a focus on intellectual, physical, and social development.",
    },
    {
      name: "Secondary School",
      description:
        "Providing a comprehensive education aimed at preparing students for local and international examinations and future academic pursuits.",
    },
  ],
  about:
    "Sharon Stars International School is a co-educational crèche, nursery, primary, and secondary school providing equal opportunities for learning with godly care and quality training. Our comprehensive curriculum aims to stimulate intellectual curiosity, encourage creativity, and develop essential skills. We focus on human development, spiritual, social, physical, and mental growth, preparing our students for success in an increasingly complex world.",
  cards: [
    {
      title: "Mission",
      details:
        "To develop children intellectually, socially, physically, and morally, inspired by the fear of God. We aim for the holistic development of each child, fostering individuals capable of using their intellect to create wealth and positively affect society.",
    },
    {
      title: "Vision",
      details:
        "To be an educational institution recognized for producing well-rounded and responsible individuals. Our students will be prepared to excel in various local and international entrance examinations and become productive members of society.",
    },
    {
      title: "Curriculum",
      details:
        "Our curriculum is comprehensive and in line with the requirements of the Nigerian Ministry of Education and British Curriculum. It balances development in psychomotor, cognitive, and affective learning domains.",
    },
    {
      title: "Extra-curricular Activities",
      details:
        "We offer a variety of indoor and outdoor activities aimed at enhancing students' physical and mental development. These activities are designed to complement the academic curriculum and promote holistic growth.",
    },
  ],
};

export const events = [
  {
    name: "Summer Lesson",
    date: "August 5th, 2024",
    time: "9:00am - 12:00am",
    image: "/assets/pngs/event1.PNG"
  },
  {
    name: "Resumption Day",
    date: "September 25th, 2023",
    time: "8:00am",
    image:"/assets/pngs/event2.PNG"
  },
  // {
  //   name: "Career Day",
  //   date: "August 13th, 2023",
  //   time: "10:00am",
  //   image:
  //     "https://s3-alpha-sig.figma.com/img/aa4f/365c/d91200750efe040da259600c27ed723c?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nRKshxJqffsFHSLDczgxRxtb5zPFty80fkxssoCJhMkAsLI9QdCtZn38TxcHD9T9MNVkDvsnSEw6thqeb~yclvavCFqeXXKTtAj3D9NsJKqwvAa3czA8VHiwZ7XTrdNYzL1urIdKuBCBjiCQV8iq3AKF-gUqSfqjV3Xs5j7rLpLbKRfMsSRqxyxDC9BRJ3hMtPueDX0eoUAC2H182VOIAaMGnPifoWdIPA6oQm3nuwXpp5AVf6IWJBOgBmP9g1ijk4J-qiMfoo~kNy3DnPbpIlz7BfzgMcHXngmPdMH6w45KLuMC9yDuI1hSH-10xHFdzA0lcJ5bI9roPRE-fo6IGQ__",
  // },
];

export const resultChecker = "https://app.cloudnotte.com"