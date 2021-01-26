module WithoutChildren exposing (main)

import Html exposing (Html)
import Html.Attributes

main : Html msg
main =
    Html.node "ce-without-children" [ Html.Attributes.id "wc" ] []
