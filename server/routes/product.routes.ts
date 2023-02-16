import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { celebrate, errors } from "celebrate";
import { CreateProductJoi } from "../shared/validators/create-product.validator";
import { DeleteProductJoi } from "../shared/validators/delete-product.validator";
import { ProductSearchByMessageJoi } from "../shared/validators/search-product-message.validator";
import { ProductSearchByKeywordsJoi } from "../shared/validators/search-product-keyword.validator";
import { authMiddlware } from "../shared/middleware/auth.middleware";
import { isAdmin } from "../shared/middleware/admin.middleware";

export class ProductRoutes {
  public router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeroutes();
    this.router.use(errors());
  }

  private initializeroutes() {
    this.router.post(
      "/create",
      authMiddlware,
      isAdmin,
      celebrate({ body: CreateProductJoi }),
      this.productController.createProduct
    );
    this.router.get(
      "/search/message",
      authMiddlware,
      celebrate({ query: ProductSearchByMessageJoi }),
      this.productController.searchByMessage
    );
    this.router.delete(
      "/:id",
      authMiddlware,
      isAdmin,
      celebrate({ body: DeleteProductJoi }),
      this.productController.deleteById
    );
    this.router.get(
      "/search",
      authMiddlware,
      celebrate({ query: ProductSearchByKeywordsJoi }),
      this.productController.showProducts
    );
  }
}
