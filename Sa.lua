addCommandHandler("bum", function()
    outputChatBox("!")
    for _, player in pairs(getElementsByType("player")) do
        triggerServerEvent("sendAme", player, "discord.gg/lifea diwness ugradi")
    end
end)
