// package src;

// public class StockMarket {

// }/*New class */

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class BankApp extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {
        primaryStage.setTitle("Bank Application");

        Button createAccountBtn = new Button("Create Account");
        Button depositBtn = new Button("Deposit Money");
        Button withdrawBtn = new Button("Withdraw Money");
        Button balanceBtn = new Button("Check Balance");
        Button exitBtn = new Button("Exit");

        StackPane layout = new StackPane();
        layout.getChildren().addAll(createAccountBtn, depositBtn, withdrawBtn, balanceBtn, exitBtn);

        Scene scene = new Scene(layout, 300, 250);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
