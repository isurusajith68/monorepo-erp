import Template1 from './_component/template-1/page'

function SelectTemplate() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] ml-10">
        <Template1></Template1>
      </div>
    </div>
  )
}

export default SelectTemplate
