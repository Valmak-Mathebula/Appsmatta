import {
  FaBolt,
  FaClock,
  FaLock,
  FaChartLine,
  FaCalculator,
  FaGlobeAfrica,
  FaLaptopCode,
  FaUsers,
} from "react-icons/fa";

function Stats() {
  const benefits = [
    {
      icon: <FaBolt size={45} className="text-primary mb-3" />,
      title: "Faster Operations",
      description:
        "Automate repetitive tasks and reduce manual effort across your business.",
    },
    {
      icon: <FaClock size={45} className="text-success mb-3" />,
      title: "Save Valuable Time",
      description:
        "Generate reports in seconds instead of spending hours updating spreadsheets.",
    },
    {
      icon: <FaLock size={45} className="text-danger mb-3" />,
      title: "Secure Business Data",
      description:
        "Protect your information with user logins, permissions and cloud backups.",
    },
    {
      icon: <FaChartLine size={45} className="text-warning mb-3" />,
      title: "Better Decisions",
      description:
        "Access live dashboards and accurate business information whenever you need it.",
    },
  ];

  const experience = [
    {
      icon: <FaCalculator size={45} className="text-primary mb-3" />,
      number: "10+",
      title: "Years Building Advanced Excel Models",
    },
    {
      icon: <FaLaptopCode size={45} className="text-success mb-3" />,
      number: "5+",
      title: "Years Developing Web Applications",
    },
    {
      icon: <FaGlobeAfrica size={45} className="text-warning mb-3" />,
      number: "3",
      title: "Digital Platforms Successfully Delivered",
    },
    {
      icon: <FaUsers size={45} className="text-danger mb-3" />,
      number: "100%",
      title: "Custom Built Solutions",
    },
  ];

  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        {/* BUSINESS BENEFITS */}

        <div className="text-center mx-auto mb-5" style={{ maxWidth: "760px" }}>
          <span className="badge bg-primary px-4 py-2 mb-3">
            BUSINESS BENEFITS
          </span>

          <h2 className="display-5 fw-bold mb-4">What Your Business Gains</h2>

          <p className="lead text-white-50">
            Every application we build is designed to improve productivity,
            collaboration and decision-making.
          </p>
        </div>

        <div className="row g-4">
          {benefits.map((item, index) => (
            <div className="col-md-6 col-xl-3" key={index}>
              <div
                className="text-center h-100 p-4"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                }}
              >
                {item.icon}

                <h4 className="fw-bold mt-3 mb-3">{item.title}</h4>

                <p className="text-white-50 mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}

        <hr
          className="my-5"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
          }}
        />

        {/* EXPERIENCE */}

        <div className="text-center mx-auto mb-5" style={{ maxWidth: "760px" }}>
          <span className="badge bg-success px-4 py-2 mb-3">
            OUR EXPERIENCE
          </span>

          <h2 className="display-5 fw-bold mb-4">
            Built On Real Business Experience
          </h2>

          <p className="lead text-white-50">
            We combine years of business modelling with modern software
            development to build applications that solve real operational
            challenges.
          </p>
        </div>

        <div className="row text-center g-4">
          {experience.map((item, index) => (
            <div className="col-md-3" key={index}>
              {item.icon}

              <h1 className="display-4 fw-bold mt-3">{item.number}</h1>

              <p className="text-white-50">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
