import { services } from "../../data/services";

const PopupContent = ({ selectedField }) => {
  return (
    <div className="bg-red-5000">
      <h5 className="text-right text-lg my-2" style={{ fontWeight: "bold" }}>
        {selectedField?.city.name}
      </h5>
      <span className="text-right">لیست سرویس های تحت پوشش:</span>
      <ul className="mt-1">
        {selectedField.city.services.map((service, index) => {
          const serviceObj = services.find((item) => item.id == service.serviceId);
          return <li key={index} className="text-right">- {serviceObj.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default PopupContent;
