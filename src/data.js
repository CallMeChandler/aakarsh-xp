export const links = {
  linkedin: 'https://www.linkedin.com/in/aakarsh-agarwal-7579061a8/',
  github: 'https://github.com/CallMeChandler',
  leetcode: 'https://leetcode.com/u/ChandlerGoneHigh/',
  resume: '/Aakarsh_July26CV.pdf',
};

export const experiences = [
  { company:'CURRYiT', role:'Software Engineering Intern', date:'Jun 2026 – Jul 2026', location:'New Delhi · On-site', icon:'🟢', bullets:['Built and deployed 10+ internal finance, supply-chain and operations systems on a unified Next.js platform.','Automated recurring PO verification, document processing, dispatch, reconciliation and marketplace workflows.','Worked across Blinkit, Swiggy, Zepto, Google Sheets, PostgreSQL, ExcelJS and Vercel.'], tools:['Next.js','Node.js','PostgreSQL','Google Sheets API','ExcelJS','Vercel'] },
  { company:'Virtus Infotech', role:'Full Stack Engineer Intern', date:'Sep 2025 – Feb 2026', location:'Remote', icon:'💻', bullets:['Built reusable React and Next.js interfaces across 15+ pages.','Developed Node.js APIs, CMS modules and PostgreSQL-backed admin workflows.'], tools:['React','Next.js','Node.js','PostgreSQL','CI/CD'] },
  { company:'Edmitry Global', role:'Frontend Intern', date:'Sep 2025 – Nov 2025', location:'Remote', icon:'🎓', bullets:['Rebuilt landing experiences and developed OTP authentication flows.','Worked on CA and Job Portal features with responsive UI systems.'], tools:['React','Next.js','Twilio','TailwindCSS'] },
  { company:'Zulu Club', role:'Automation & Backend Intern', date:'Aug 2025 – Sep 2025', location:'Remote', icon:'⚡', bullets:['Automated scraping and CSV-processing pipelines for catalogue and operations data.','Integrated WhatsApp ordering flows, FTP storage and backend services.'], tools:['Python','Node.js','Selenium','MongoDB','FTP'] },
  { company:'E-Cell, BIT Mesra', role:'Technical Lead', date:'Feb 2025 – Present', location:'BIT Mesra', icon:'🚀', bullets:['Built the E-Summit platform with registration, database and admin-panel workflows.','Supported 500+ registrations and concurrent event administration.'], tools:['React','Node.js','MongoDB','Vercel'] },
];

export const projects = [
  {
    name:'NeuralKernel', year:'2026', kind:'32-bit Operating System + Embedded AI', icon:'🧠', image:'/project-art/neural-kernel.svg',
    description:'A 32-bit operating system built from scratch with paging, heaps, filesystems, interrupts, preemptive scheduling, syscalls, ELF loading, Ring 3 userspace, a shell, login system and editor. Lightweight in-kernel models power a neural scheduler, memory predictor, anomaly watchdog and natural-language shell mode.',
    stack:['C','C++','x86 Assembly','GRUB','QEMU','Paging','ELF','Syscalls'],
    live:'https://lnkd.in/gbqNeKYZ', github:'https://lnkd.in/gckgV6kQ', learn:'https://lnkd.in/gKXey8DN'
  },
  {
    name:'RoomVerse AI', year:'2026', kind:'Spatial Intelligence + Generative AI', icon:'🏠', image:'/project-art/roomverse.svg',
    description:'Transforms a room photograph into style-aware interior redesigns, structured scene intelligence and RPG-style top-down maps. A custom reasoning pipeline fuses depth, segmentation and semantic representations before generation.',
    stack:['Python','MiDaS','SAM','CLIP','ControlNet','Stable Diffusion','Computer Vision'],
  },
  {
    name:'Multi-Agent Traffic RL', year:'2026', kind:'Reinforcement Learning Simulator', icon:'🚦', image:'/project-art/traffic-rl.svg',
    description:'A two-intersection traffic corridor simulator controlled by multi-agent tabular Q-learning. It models interpretable queue states, KEEP/SWITCH actions, minimum-green constraints, spillback-aware congestion rewards and reproducible Bellman TD updates.',
    stack:['Python','Q-Learning','MDP','Bellman Equation','Temporal Difference','Simulation'],
  },
  {
    name:'PersonaLens', year:'2026', kind:'Multimodal Transformer System', icon:'🔎', image:'/project-art/personalens.svg',
    description:'A full-stack system that measures baseline-relative inconsistency across text, audio and video. Transformer representations identify semantic drift, vocal delivery shifts and temporal visual changes, while clustering and timelines localize where they occur.',
    stack:['Transformers','NLP','wav2vec2','VideoMAE','Clustering','Full Stack','AI APIs'],
    github:'https://lnkd.in/ghZXHTGz'
  },
  {
    name:'Inception DeepDream', year:'2026', kind:'CNN Feature Visualisation', icon:'🌀', image:'/project-art/deepdream.svg',
    description:'An interactive DeepDream system that performs gradient ascent directly on input pixels to maximize Inception-V3 activations. Multi-scale octaves recursively amplify learned textures into surreal, layer-dependent visual patterns.',
    stack:['TensorFlow','Keras','Inception-V3','CNN','Gradient Ascent','Gradio','Hugging Face'],
    live:'https://lnkd.in/gmQ5Gjcn', github:'https://lnkd.in/gg-gXWmB'
  },
  {
    name:'CIFAR-10 MLP From Scratch', year:'2026', kind:'Deep Learning From First Principles', icon:'🔢', image:'/project-art/cifar-mlp.svg',
    description:'A math-first multilayer perceptron implemented in pure NumPy for 32×32 RGB and grayscale CIFAR-10. Includes forward and backpropagation, stable softmax, cross-entropy, He initialization, momentum SGD, early stopping, evaluation and framework comparison.',
    stack:['Python','NumPy','TensorFlow','Keras','Backpropagation','CIFAR-10','Matplotlib'],
    github:'https://lnkd.in/gpzCUV2j'
  },
  {
    name:'Fake Review Detector', year:'2026', kind:'Classical NLP Product', icon:'🕵️', image:'/project-art/fake-review.svg',
    description:'A 92.93%-accuracy e-commerce review classifier combining word n-grams and character TF-IDF features with a calibrated Linear SVM. The Streamlit interface supports single reviews, CSV uploads and interactive decision-threshold tuning.',
    stack:['Python','scikit-learn','Linear SVM','TF-IDF','CountVectorizer','Streamlit','NLP'],
    github:'https://lnkd.in/gE4kDcyX'
  },
];

export const skillGroups = [
  ['Languages',['Python','TypeScript','JavaScript','SQL','C++','C','Java']],
  ['Frontend & Backend',['React','Next.js','Node.js','Express.js','REST APIs','TailwindCSS','Framer Motion','Three.js','Streamlit','Gradio']],
  ['Databases & Infra',['PostgreSQL','MongoDB','Redis','Firebase','Supabase','Prisma ORM','Docker','AWS S3','Vercel','Render']],
  ['AI / ML',['PyTorch','TensorFlow','Keras','scikit-learn','NumPy','NLP','Computer Vision','Transformers','Reinforcement Learning','Stable Diffusion','ControlNet','CLIP','SAM','MiDaS']],
  ['Automation & Tools',['Playwright','Google Sheets API','Gmail API','ExcelJS','Postman','Git','GitHub','Linux','CI/CD','QEMU','GRUB']],
  ['Core CS',['Data Structures & Algorithms','OOP','DBMS','Operating Systems','Computer Networks','Computer Architecture']],
];
