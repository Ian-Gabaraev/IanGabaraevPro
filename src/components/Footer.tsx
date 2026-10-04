import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {year} Ian Gabaraev</p>
        <a
          href="https://iangabaraev.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Technical Blog
        </a>
      </div>
    </footer>
  );
};

export default Footer;
