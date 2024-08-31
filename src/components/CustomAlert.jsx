import React from "react";
import "../css/CustomAlert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div class="alert">Sepete ürün eklemek için lütfen bir adet seçin.</div>
  );
};

export default CustomAlert;
