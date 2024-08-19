import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-white text-black py-8 border-t-4 border-red-600">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <img src="/logo.png" className="w-10 h-10 mr-2" alt="logo" />
              <h3 className="text-xl font-bold text-red-600">MedFix</h3>
            </div>
            <p className="mt-4">
              Trust us for reliable service, expert advice, and the best in
              healthcare solutions.
            </p>
          </div>

          <div className="ml-10">
            <h3 className="text-xl font-bold text-red-600">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li
                className="hover:underline cursor-pointer"
                onClick={() => router.push("/")}
              >
                Home
              </li>
              <li
                className="hover:underline cursor-pointer"
                onClick={() => router.push("/product/listing/all-products")}
              >
                Shop
              </li>
            </ul>
          </div>

          <div className="lg:mt-0 mt-4">
            <h3 className="text-xl font-bold text-red-600">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li>Email: contact@medfix.com</li>
              <li>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-600">Follow Us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="https://facebook.com" legacyBehavior>
                  <a className="hover:underline">Facebook</a>
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com" legacyBehavior>
                  <a className="hover:underline">Twitter</a>
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com" legacyBehavior>
                  <a className="hover:underline">Instagram</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          &copy; 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
