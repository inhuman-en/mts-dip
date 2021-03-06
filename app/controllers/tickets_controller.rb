class TicketsController < ApplicationController
  # GET /tickets
  # GET /tickets.json
  def index
    
    if params["doctor_id"] != nil
      @tickets = Ticket.where(:doctor_id => params["doctor_id"], :data => params["data"]);

    elsif params["data"] != nil and  params["user_id"] != nil      
      @tickets = Ticket.where(user_id:params["user_id"], data:params["data"]);
    else
      @tickets = Ticket.all
        
    end  

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tickets }
    end
  end

  # GET /tickets/1
  # GET /tickets/1.json
  def show
    @ticket = Ticket.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @ticket }
    end
  end

  # GET /tickets/new
  # GET /tickets/new.json
  def new
    @ticket = Ticket.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @ticket }
    end
  end

  # GET /tickets/1/edit
  def edit
    @ticket = Ticket.find(params[:id])
  end

  # POST /tickets
  # POST /tickets.json
  def create
    @ticket = Ticket.new(params[:ticket])

    respond_to do |format|
      if @ticket.save
        format.html { redirect_to @ticket, notice: 'Ticket was successfully created.' }
        format.json { render json: @ticket, status: :created, location: @ticket }
      else
        format.html { render action: "new" }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tickets/1
  # PUT /tickets/1.json
  def update
    @ticket = Ticket.find(params[:id])

    respond_to do |format|
      if @ticket.update_attributes(params[:ticket])
        format.html { redirect_to @ticket, notice: 'Ticket was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tickets/1
  # DELETE /tickets/1.json
  def destroy
    @ticket = Ticket.find(params[:id])
    @ticket.destroy

    respond_to do |format|
      format.html { redirect_to tickets_url }
      format.json { head :no_content }
    end
  end

  #GET /tickets/1/doctor_name
  #GET /tickets/1/doctor_name.json
  def doctor_name
    @tickets = Ticket.where(:user_id => params[:user_id])

    out = []
    @tickets.each do |t|
      info = {:user_id => t.user_id, :doctor_id => t.doctor_id, :doctor_name => t.doctor.name, :data => t.data, :time => t.time}
      out.push info
    end

    respond_to do |format|
      format.json { render json: out}
    end
  end
end
