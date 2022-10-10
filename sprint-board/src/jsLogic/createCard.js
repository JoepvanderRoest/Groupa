export function createDummyCard(board){
    const newBoardState = board
    const firstSectionId = newBoardState["board_sections"][0]["board_section_id"]
    const testcard = {board_section_id : firstSectionId, body : "Lorem ipsum ", card_id : "9999", title : "CardTitle", status : "0"}
    newBoardState["board_sections"][0]["cards"].push(testcard)
    return newBoardState
}
