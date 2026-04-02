import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="contact-content"
        >
          <p className="section-title">Contact</p>

          <div className="contact-info">
            <div className="contact-item">
              <Mail size={18} />
              <a href="mailto:iandevhkt@gmail.com">iandevhkt@gmail.com</a>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <span>Remote — Open to relocation</span>
            </div>
          </div>

          <div className="contact-social">
            <a
              href="https://github.com/Ian-Gabaraev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={20} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/iangabaraev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
