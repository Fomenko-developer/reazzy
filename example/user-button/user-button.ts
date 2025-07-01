import { Component } from "../../src/framework/component";

@Component({
    selector: "user-button",
    templateUrl: "./user-button.html",
    styleUrl: "./user-button.scss",
})
export class UserButton {
    label = "I'm a button";

    onClick() {
        alert("example click");
    }
}
