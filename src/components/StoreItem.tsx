import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from '../utilities/formatCurrency'

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export const StoreItem = ({id, name, price, imgUrl}: StoreItemProps)=>{
    const { 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart 
    } = useShoppingCart();
    const quantity = getItemQuantity(id);

    return <Card className="h-100">
        <Card.Img  
            variant="top"
            src={imgUrl} 
            height="200px"
            style={{objectFit: "cover"}}
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            {
                quantity === 0 ? 
                <Button className="w-100" onClick={()=>increaseCartQuantity(id)}>+ Add to cart</Button> : 
                <div className="d-flex flex-column align-items-center" style={{gap: ".5rem"}}>
                    <div>
                        <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                        <span className="fs-3">{quantity}</span> in cart
                        <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                    </div>
                    <Button variant="danger" className="sm" onClick={()=>removeFromCart(id)}>Remove</Button>
                </div>
            }
        </Card.Body>
    </Card>
} 