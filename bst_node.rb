class BSTNode
  attr_reader :value
  attr_accessor :left, :right

  def initialize(value)
    this.value = value
    this.left = nil
    this.right = nil
  end
end
