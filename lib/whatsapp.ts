export const sendWhatsAppMessage = (
  name: string,
  phone: string,
  email: string,
  requirement: string
) => {
  const message = `*New Video Conference Request*%0A%0A
Name: ${name}%0A
Phone: ${phone}%0A
Email: ${email}%0A
Requirement: ${requirement}`;

  const whatsappNumber =
    "918687878755";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank"
  );
};