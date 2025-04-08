'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuthStore();
  const imageSliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: '/Slide1.webp', comment: '"We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!"', commentor: 'Sarah Markivoc - Project Manager' },
    { src: '/Slide2.webp', comment: '"The intuitive interface made onboarding our team a breeze. Room.me is a game-changer for our remote collaboration."', commentor: 'John Doe - CEO' },
    { src: '/Slide3.webp', comment: '"High-quality video and stable connections are what we needed, and Room.me delivers. Our meetings are now more productive and engaging."', commentor: 'Jane Smith - Marketing Lead' },
    // Add more images with their respective comments and commentors
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (imageSliderRef.current) {
      imageSliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
    if (email === 'test@visionexdigital.com.au' && password === 'password123') {
      login();
      document.cookie = 'isLoggedIn=true'; // For middleware
      router.push('/dashboard');
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'YOUR_GOOGLE_SIGN_IN_URL';
  };

  return (
    <div className="min-h-screen flex bg-black text-white rounded-3xl overflow-hidden mx-auto my-0 md:my-0 lg:my-0 md:max-w-2xl lg:max-w-7xl shadow-2xl">
      <div className="flex-1 flex justify-center items-stretch md:flex-row-reverse">
        <div className="hidden md:flex md:w-1/2 justify-center items-center md:p-6 lg:p-10">
          <div className="w-full overflow-hidden rounded-lg shadow-md relative">
            <div
              className="flex transition-transform duration-500  ease-in-out"
              id="imageSlider"
              ref={imageSliderRef}
              style={{ height: '800px' }}
            >
              {images.map((image, index) => (
                <div key={index} className="relative min-w-full" style={{ height: '800px' }}>
                  <Image
                    src={image.src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    fill // Use fill and style objectFit for proper sizing within the container
                    style={{ objectFit: 'cover' }}
                  />
                  {image.comment && (
                    <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md rounded-md p-6 text-white">
                      <p className="text-xl mb-3">{image.comment}</p>
                      {image.commentor && (
                        <p className="text-lg italic text-gray-300">{image.commentor}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-24 h-1.5 rounded-md mx-1.5 ${
                    currentIndex === index ? 'bg-violet-400' : 'bg-gray-700'
                  }`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:p-6 lg:p-14">
          <div className="flex items-center mb-12 w-full justify-start">
            <div className="relative w-48 h-14 mb-6 ml-9">
              <Image src="/LOGO.png" alt="Room.me Logo" fill objectFit="contain" />
            </div>
          </div>
          <h2 className="text-4xl mr-6.5 font-bold mb-5 text-left">Welcome back Room.me!</h2>
          <p className="text-lg text-gray-400 ml-9.5 mb-5 text-left">
            Room.me is an innovative video conference product that revolutionizes
            virtual meetings.
          </p>
          <form  className="w-full max-w-md">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-lg font-bold mb-3 text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-7">
              <label
                htmlFor="password"
                className="block text-lg font-bold mb-3 text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-lg mb-5">{error}</p>}
            <button
              type="submit"
              onClick={handleLogin}
              className="font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-xl text-white w-full cursor-pointer"
              style={{
                background: 'linear-gradient(90deg, #8B80FF 0%, #5C53BC 100%)',
              }}
            >
              Sign in
            </button>
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="bg-gray-900 border border-gray-700 text-xl text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center items-center cursor-pointer"
              >
                <Image src="/google.png" alt="Google Icon" className="w-8 h-8 mr-3" width={32} height={32} />
                Sign in with Google
              </button>
            </div>
            <div className="mt-5 text-center">
              <a
                href="#"
                className="inline-block align-baseline font-semibold text-lg text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </a>
            </div>
            <div className="mt-3 text-center text-gray-400 text-lg">
              Don't have an account? <a href="#" className="text-blue-400">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;