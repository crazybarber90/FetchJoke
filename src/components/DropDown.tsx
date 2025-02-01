import React from 'react'

const DropDown = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  categories: string[]
}) => {
  return (
    <div className="dropDownWrapper">
      <label htmlFor="category">Choose a category:</label>
      <select
        value={selectedCategory}
        id="category"
        onChange={(e: any) => setSelectedCategory(e.target.value)}
      >
        <option value="">Random</option>
        {categories.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropDown
