import { CartItem, Guitar } from "../types";

interface HeaderProps {
  isEmpty: boolean;
  cartTotal: number;
  cart: CartItem[];
  removeFromCart: (id: Guitar["id"]) => void;
  increaseQuantity: (id: Guitar["id"]) => void;
  decreaseQuantity: (id: Guitar["id"]) => void;
  clearCart: () => void;
}

const Header = ({ isEmpty, cartTotal, cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }: HeaderProps) => {

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              ta                              <button onClick={() => decreaseQuantity(guitar.id)} type="button" className="btn btn-dark">
                                -
                              </button>
                              {guitar.quantity}
                              <button onClick={() => increaseQuantity(guitar.id)} type="button" className="btn btn-dark">
                                +
                              </button>
                            </td>
                            <td>
                              <button onClick={() => removeFromCart(guitar.id)} className="btn btn-danger" type="button">
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}

                <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
