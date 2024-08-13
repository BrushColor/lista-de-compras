document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-itens button")
  const fieldToAdd = document.getElementById("field-to-add")
  const itemContainer = document.getElementById("itemContainer")
  const alertBox = document.querySelector(".alert")
  const cancelAlertButton = alertBox.querySelector(
    'img[src="assets/icons/cancel.svg"]'
  )
  const logo = document.querySelector(".logo")
  const statusBar = document.querySelector(".status-bar")


  function loadItems() {
    const items = JSON.parse(localStorage.getItem("items")) || []
    items.forEach((item) => {
      createItemElement(item.text)
    })
  }

  function createItemElement(itemText) {
    const newCheckboxWrapper = document.createElement("div")
    newCheckboxWrapper.className = "checkbox-wrapper"

    const checkboxImage = document.createElement("div")
    checkboxImage.className = "checkbox-image"

    const newCheckbox = document.createElement("input")
    newCheckbox.type = "checkbox"
    newCheckbox.name = "itens"

    const newLabel = document.createElement("label")
    newLabel.textContent = itemText

    const deleteIcon = document.createElement("img")
    deleteIcon.className = "delete"
    deleteIcon.src = "assets/icons/delete.svg"
    deleteIcon.alt = "ícone de deletar"

    
    deleteIcon.addEventListener("click", () => {

      itemContainer.removeChild(newCheckboxWrapper)

      const items = JSON.parse(localStorage.getItem("items")) || []
      const updatedItems = items.filter((i) => i.text !== itemText)
  
      localStorage.setItem("items", JSON.stringify(updatedItems))

      alertBox.style.display = "flex"

      setTimeout(() => {
        alertBox.style.display = "none"
      }, 5000)
    })

    newCheckboxWrapper.appendChild(checkboxImage)
    newCheckboxWrapper.appendChild(newCheckbox)
    newCheckboxWrapper.appendChild(newLabel)
    newCheckboxWrapper.appendChild(deleteIcon)

    itemContainer.appendChild(newCheckboxWrapper)
  }

  function addItem() {
    const itemText = fieldToAdd.value.trim()

    if (itemText === "") {
      alert("Por favor, adicione um item!")
      return
    }

    createItemElement(itemText)

    
    const items = JSON.parse(localStorage.getItem("items")) || []
    items.push({ text: itemText })
    localStorage.setItem("items", JSON.stringify(items))

    fieldToAdd.value = ""
  }

  addButton.addEventListener("click", addItem)

  fieldToAdd.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
      event.preventDefault()
      addItem()
    }
  })

  cancelAlertButton.addEventListener("click", () => {
    alertBox.style.display = "none"
  })

  function handleResize() {
    if (window.innerWidth <= 768) {
      logo.style.display = "none"
      statusBar.style.display = "flex"
    } else {
      logo.style.display = "block"
      statusBar.style.display = "none"
    }
  }

  handleResize()
  window.addEventListener("resize", handleResize)

  
  loadItems()
})
