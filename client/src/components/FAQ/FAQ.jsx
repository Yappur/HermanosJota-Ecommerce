import { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    id: 1,
    question: "¿Cuál es el tiempo de entrega de los muebles?",
    answer:
      "El tiempo de entrega varía según el producto y tu ubicación. Generalmente, los muebles en stock se entregan en 5-7 días hábiles. Para muebles personalizados o bajo pedido, el tiempo puede extenderse de 3 a 6 semanas. Te notificaremos el tiempo exacto al momento de tu compra.",
  },
  {
    id: 2,
    question: "¿Ofrecen servicio de armado e instalación?",
    answer:
      "Sí, ofrecemos servicio profesional de armado e instalación para todos nuestros muebles. Este servicio tiene un costo adicional que varía según el tipo y tamaño del mueble. Nuestro equipo se encargará de dejar todo perfectamente instalado en tu hogar.",
  },
  {
    id: 3,
    question: "¿Qué garantía tienen los muebles?",
    answer:
      "Todos nuestros muebles cuentan con garantía de 2 años contra defectos de fabricación. La garantía cubre problemas estructurales y de materiales, pero no incluye daños por uso inadecuado o desgaste normal. Conserva tu factura para hacer válida la garantía.",
  },
  {
    id: 4,
    question: "¿Puedo personalizar los muebles?",
    answer:
      "Absolutamente. Ofrecemos opciones de personalización en tapizados, acabados de madera, dimensiones y configuraciones. Nuestro equipo de diseño trabajará contigo para crear el mueble perfecto que se adapte a tu espacio y estilo. Agenda una cita para discutir tus ideas.",
  },
  {
    id: 5,
    question: "¿Cuáles son las formas de pago disponibles?",
    answer:
      "Aceptamos múltiples formas de pago: efectivo, tarjetas de crédito y débito, transferencias bancarias y planes de financiamiento. Ofrecemos opciones de pago a meses sin intereses en compras mayores. Consulta con nuestros asesores las promociones vigentes.",
  },
  {
    id: 6,
    question: "¿Tienen política de devoluciones?",
    answer:
      "Sí, aceptamos devoluciones dentro de los primeros 15 días posteriores a la entrega, siempre que el mueble esté en perfectas condiciones, sin uso y en su empaque original. Los muebles personalizados no son elegibles para devolución. Se aplicará un cargo por recolección.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleQuestion = (id) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Preguntas Frecuentes</span>
            <span className="eyebrow-line"></span>
          </div>
          <h2 className="heading section-title">¿Tienes Dudas?</h2>
          <p className="text-body section-description">
            Encuentra respuestas a las preguntas más comunes sobre nuestros
            muebles, entregas y servicios. Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="faq-container">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`faq-item ${openId === item.id ? "active" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleQuestion(item.id)}
                aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      className="faq-icon-horizontal"
                    ></line>
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${item.id}`}
                className="faq-answer"
                role="region"
              >
                <div className="faq-answer-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
